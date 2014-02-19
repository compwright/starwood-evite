<?php

$basedir = dirname($_SERVER['DOCUMENT_ROOT']);
require_once $basedir . '/vendor/asimlqt/php-google-spreadsheet-client/src/Google/Spreadsheet/Autoloader.php';

// Spreadsheet must be shared with the Google Oauth 2 service client email
$spreadsheet = 'Starwood Evite';
$worksheet = 'Sheet1';

// Get the Oauth 2.0 access token
$client = require_once __DIR__ . '/google.php';
$access_token = json_decode($client->getAccessToken());

// Configure the Spreadsheet API client
Google\Spreadsheet\ServiceRequestFactory::setInstance(
	new Google\Spreadsheet\DefaultServiceRequest(
		new Google\Spreadsheet\Request($access_token->access_token)
	)
);

$svc = new Google\Spreadsheet\SpreadsheetService();

return $svc->getSpreadsheets()
           ->getByTitle($spreadsheet)
           ->getWorksheets()
           ->getByTitle($worksheet);
