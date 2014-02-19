<?php

$basedir = dirname($_SERVER['DOCUMENT_ROOT']);
require_once $basedir . '/vendor/google/google-api-php-client/src/Google_Client.php';

$email = '241774127698-h1lsdmton7bcmt6npcktca5sifpbo3ep@developer.gserviceaccount.com';
$scope = 'https://spreadsheets.google.com/feeds';
$keyfile = '9219de5ec4170ddf16a911447657b8732f17a445-privatekey.p12';

$client = new Google_Client();

// Get an access token using the Google Oauth 2 Service Account API
// https://developers.google.com/accounts/docs/OAuth2ServiceAccount
// https://code.google.com/p/google-api-php-client/wiki/OAuth2#Service_Accounts
$client->setAssertionCredentials(
	new Google_AssertionCredentials(
		$email,
		array($scope),
		file_get_contents(__DIR__ . '/' . $keyfile)
	)
);
Google_Client::getAuth()->refreshTokenWithAssertion();

return $client;
