<?php

header('Content-type: text/calendar; charset=utf-8');
header('Content-Disposition: attachment; filename=starwood-evite.ics');

readfile('starwood-evite.ics');
