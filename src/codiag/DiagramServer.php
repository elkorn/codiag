<?php
namespace codiag;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\WampServerInterface;

class DiagramServer implements WampServerInterface {
    protected $diagrams = array();

    public function __construct() {
    }

    /**
     * {@inheritdoc}
     */
    public function onOpen(ConnectionInterface $conn) {
        echo "New connection: {$conn->resourceId}\n";
        $conn->Diagram        = new \StdClass;
        $conn->Diagram->id = null;
        
        echo "New connection: {$conn->resourceId}\n";
    }

    /**
     * {@inheritdoc}
     */
    public function onClose(ConnectionInterface $conn) {
        $this->onUnSubscribe($conn, $conn->Diagram->id);
    }

    /**
     * {@inheritdoc}
     */
    function onCall(ConnectionInterface $conn, $id, $fn, array $params) {
    }

    /**
     * {@inheritdoc}
     */
    function onSubscribe(ConnectionInterface $conn, $topic) {
        echo "{$conn->resourceId} subscribed to {$topic}\n";
        
        $diagramId = $topic; // See what I did there?
        
        // Diagram not opened in current session
        if (!array_key_exists($diagramId, $this->diagrams)) {
            // TODO: Get diagram from DB, add it to diagrams list
            // For now we're gonna just save/create it here regardless
            $this->diagrams[$diagramId] = new \StdClass;
            $this->diagrams[$diagramId]->connections = new \SplObjectStorage;
            $this->diagrams[$diagramId]->data = '';
            $this->diagrams[$diagramId]->name = '';
        }

        $this->diagrams[$diagramId]->connections->attach($conn);

        if ($conn->Diagram->id !== null) {
            // Should not happen, dunno what to do here
            // Maybe a cleanup if this connection is present elsewhere
            
            return;
        }
        
        $conn->Diagram->id = $diagramId;
        
        //$conn->event($diagramId, $this->diagrams[$diagramId]->data); // TODO
    }

    /**
     * {@inheritdoc}
     */
    function onUnSubscribe(ConnectionInterface $conn, $topic) {
        echo "{$conn->resourceId} unsubscribed from {$topic}\n";
        
        $diagramId = $topic; // See what I did there?

        $this->diagrams[$diagramId]->connections->detach($conn);

        if ($this->diagrams[$diagramId]->connections->count() == 0) {
            echo "No connections in {$diagramId}\n";
            unset($this->diagrams[$diagramId]);
            //$this->broadcast(static::CTRL_ROOMS, array($topic, 0));
        } else {
            //$this->broadcast($topic, array('leftRoom', $conn->WAMP->sessionId));
        }
    }

    /**
     * {@inheritdoc}
     */
    function onPublish(ConnectionInterface $conn, $topic, $event, array $exclude = array(), array $eligible = array()) {
        echo "{$conn->resourceId} published to {$topic}\n";
        echo "Message: {$event}\n";
        
        $diagramId = (string)$topic;
        if (empty($event)) {
            return;
        }

        if ($diagramId !== $conn->Diagram->id || !array_key_exists($diagramId, $this->diagrams)) {
            
            return;
        }

        // TODO: Add decode and timestamp magic
        $event = htmlspecialchars($event);

        $this->broadcast($diagramId, $event);
    }

    /**
     * {@inheritdoc}
     */
    public function onError(ConnectionInterface $conn, \Exception $e) {
        $conn->close();
    }

    protected function broadcast($diagramId, $msg, ConnectionInterface $exclude = null) {
        foreach ($this->diagrams[$diagramId]->connections as $client) {
            if ($client !== $exclude) {
                $client->event($diagramId, $msg);
            }
        }
    }

    /**
     * @param string
     * @return string
     */
    protected function escape($string) {
        return htmlspecialchars($string);
    }
}