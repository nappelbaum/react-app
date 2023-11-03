<?php

class User
{
  private $name;
  private $lastname;
  private $email;
  private $id;
  
  function __construct($id, $name, $lastname, $email)
  {
    $this->id = $id;
    $this->name = $name;
    $this->lastname = $lastname;
    $this->email = $email;
  }

  function getId() {return $this->id;}
  function getName() {return $this->name;}
  function getLastname() {return $this->lastname;}
  function getEmail() {return $this->email;}

  //статический метод добавления пользователя в базу данных
  static function addUser($name, $lastname, $email, $pass) {
    global $mysqli;
    
    $email = mb_strtolower(trim($email));
    $pass = trim($pass);
    $pass = password_hash($pass, PASSWORD_DEFAULT);

    $mysqli->set_charset("utf8");
    $result = $mysqli->query("SELECT * FROM `users` WHERE`email`='$email'");
    if($result->num_rows != 0) {
      return json_encode(["result"=>"exist"]);
    } else {
      User::logOut();
      $mysqli->query("INSERT INTO `users` (`name`, `lastname`, `email`, `pass`) VALUES ('$name', '$lastname', '$email', '$pass')");
      return json_encode(["result"=>"success"]);
    }
  }

  //статический метод авторизации пользователя
  static function authUser($email, $pass) {
    global $mysqli;

    $mysqli->set_charset("utf8");

    $email = trim(mb_strtolower($email));
    $pass = trim($pass);

    $result = $mysqli->query("SELECT * FROM `users` WHERE `email`='$email'");
    $result = $result->fetch_assoc();

    if($result) {
      if (password_verify($pass, $result["pass"])) {
        $_SESSION["id"] = $result["id"];
        setcookie(session_name(), session_id(), time()+3600*24*7, '/');
        unset($result["pass"]);
        return json_encode($result);
      } else {
        return json_encode(["result"=>"no_pass"]);
      }
    } else {
      return json_encode(["result"=>"no_email"]);
    }
  }

  //статический метод выхода из аккаунта
  static function logOut() {
    if (count($_SESSION) != 0) {
      unset($_SESSION["id"]);
      unset($_COOKIE['PHPSESSID']);
      session_destroy();
    }
  }

  //статический метод получения данных пользователя
  static function getUser($userId) {
    global $mysqli;
    $mysqli->set_charset("utf8");
    $result = $mysqli->query("SELECT `name`, `lastname`, `email`, `id`, `foto` FROM `users` WHERE `id`='$userId'");
    $result = $result->fetch_assoc();
    return json_encode($result);
  }

  //статический метод получения данных всех пользователей
  static function getUsers() {
    global $mysqli;
    $mysqli->set_charset("utf8");
    $result = $mysqli->query("SELECT `name`, `lastname`, `email`, `id`, `foto` FROM `users` WHERE 1");
    
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    return json_encode($users);
  }

  //статический метод загрузки фото
  static function addFoto($userId) {
    $file = $_FILES["foto"];
    $fileExt = explode(".", $file["name"])[1];
    $fileName = $userId . "." . $fileExt;
    $dirName = "../img/users/" . $userId . "/";

    if (!is_dir($dirName)) {
        mkdir($dirName);
    }

    if(file_exists($dirName . $fileName)) {
        unlink($dirName . $fileName); 
    }
    copy($file["tmp_name"], $dirName . $fileName);
  
    global $mysqli;
    $mysqli->set_charset("utf8");

    $result = $mysqli->query("UPDATE `users` SET `foto`='$fileName' WHERE `id`='$userId'");

    if($result) {
      $result = $mysqli->query("SELECT `foto`, `id` FROM `users` WHERE `id`='$userId'");
      $result = $result->fetch_assoc();
      return json_encode($result);
    } else {
      return json_encode(["result"=>"error"]);
    }
  }
}

