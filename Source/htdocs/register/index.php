<?php

$basedir = dirname($_SERVER['DOCUMENT_ROOT']);
$worksheet = require_once $basedir . '/app/config/spreadsheet.php';
$mailer = require_once $basedir . '/app/config/email.php';

// Save to a Google Spreadsheet
$worksheet->getListFeed()->insert(array(
	'response' => htmlentities($_POST['response']),
	'firstname' => htmlentities($_POST['first_name']),
	'lastname'  => htmlentities($_POST['last_name']),
	'title' => htmlentities($_POST['title']),
	'organization' => htmlentities($_POST['organization']),
	'email' => htmlentities($_POST['email']),
	'phone' => htmlentities($_POST['phone']),
	'address' => htmlentities($_POST['address']),
	'city' => htmlentities($_POST['city']),
	'state' => htmlentities($_POST['state']),
	'zip' => htmlentities($_POST['zip']),
	'datetime' => htmlentities(date('Y-m-d H:i:s')),
	'ip' => htmlentities($_SERVER['REMOTE_ADDR']),
));

if (strtolower($_POST['response']) === 'accept')
{
	$text = <<<TEXT
Dear {$_POST['first_name']},

Your registration for Starwood's Carnival of Curiosities is confirmed.
We look forward to a magical evening Thursday, November 20, 6pm - 9pm.

For directions to Le Meridien Perimeter, click here:

  http://bit.ly/lemeridienperimeter

To add this event to your Outlook calendar, click here:

  http://bit.ly/starwoodinvite

Your host,
Starwood Hotels

TEXT;

	// Compose an email confirmation message
	$attachment = Swift_Attachment::fromPath($basedir . '/htdocs/starwood-evite.ics', 'text/calendar');
	$message = Swift_Message::newInstance()
		->setSubject('Starwood Carnival of Curiosities RSVP confirmation')
		->setFrom('no-reply@starwoodparties.com')
		->setTo($_POST['email'])
		->setBody($text)
		->attach($attachment);

	// Send the email confirmation
	$mailer->send($message);

	// Redirect to the confirmation page
	header('Location: ../register-accept.html');	
}
else
{
	header('Location: ../register-decline.html');
}
