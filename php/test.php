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
}
