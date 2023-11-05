<?php
session_start();

require_once("classes/User.php");
require_once("db.php");
$postName = $_POST["postName"];

if ($postName == "regUser") {
    echo User::addUser($_POST["name"], $_POST["lastname"], $_POST["email"], $_POST["pass"]);
} else if ($postName == "authUser") {
    echo User::authUser($_POST["email"], $_POST["pass"]);
} else if ($postName == "logOut") {
    User::logOut();
} else if ($postName == "getUser") {
    if (count($_SESSION) != 0) {
        echo User::getUser($_SESSION["id"]);
    }
    // echo User::getUser(2);
} else if ($postName == "addFoto") {
    echo User::addFoto($_POST["id"]);
} else if ($postName == "getUsers") {
    echo User::getUsers();
}
