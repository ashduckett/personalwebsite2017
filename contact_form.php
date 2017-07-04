<?php

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // the message
    $msg = "Hello Ash,\n\n" . $name . " has contacted you from your website with the message:\n\n" . $message . "\n\nIf you want to get back to them, use " . $email . ".";

    // use wordwrap() if lines are longer than 70 characters
    $msg = wordwrap($msg, 70);

    // send email
    mail("ash.duckett@outlook.com", "My subject", $msg);

