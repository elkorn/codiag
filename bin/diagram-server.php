<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\Wamp\ServerProtocol;
use codiag\DiagramServer;

require dirname(__DIR__) . '/vendor/autoload.php';

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new ServerProtocol(
                new DiagramServer()
            )
        )
    ),
    8080
);

$server->run();

?>
