<?php

$basedir = dirname($_SERVER['DOCUMENT_ROOT']);
require_once $basedir . '/vendor/swiftmailer/swiftmailer/lib/swift_required.php';

$transport = Swift_SmtpTransport::newInstance('smtp.mandrillapp.com', 587)
	->setUsername('email@domain.com')
	->setPassword('******');

return Swift_Mailer::newInstance($transport);
