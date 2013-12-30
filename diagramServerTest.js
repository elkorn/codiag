var diagramServerTest = {
    
    sess: null, // session object
    topic: null,
 
    init: function( settings ) {
        diagramServerTest.config = {
            $publishButton: $('#publish-button'),
            $subscribeButton: $('#subscribe-button'),
            $topicName: $('#topic-name'),
            $eventText: $('#event-text'),
            wsLocation: 'ws://localhost:8080'
        };

        $.extend( diagramServerTest.config, settings );
        
        if (!diagramServerTest.checkConfig()) {
            console.log('diagramServerTest: bad config!');
            return;
        }
 
        diagramServerTest.setup();
    },
            
    setup: function() {
        var self = this;
        
        self.config.$publishButton.prop('disabled', true);
        
        ab.connect(self.config.wsLocation,
 
            // WAMP session was established
            function (session) {
                console.log('Connected to server');
                self.sess = session;
            },

            // WAMP session is gone
            function (code, reason) {
                self.sess = null;
                console.log("Connection lost (" + reason + ")");
            }
        );
        
        self.config.$subscribeButton.click(function() {
            var fieldValue = self.config.$topicName.val();
            
            if (fieldValue && self.sess.sessionid()) {
                self.sess.subscribe(fieldValue, function(topic, event) {
                    console.log('Topic: ' + topic);
                    console.log('Event: ' + event);
                    self.config.$eventText.val(event);
                });
                
                self.topic = fieldValue;
                
                self.config.$publishButton.prop('disabled', false);
                self.config.$subscribeButton.prop('disabled', true);
            }
        });
        
        self.config.$publishButton.click(function() {
            var fieldValue = self.config.$eventText.val();
            
            if (fieldValue && self.sess.sessionid()) {
                self.sess.publish(self.topic, fieldValue);
            }
        });
    },
            
    checkConfig: function() {
        var config = this.config;
        
        if (!(config.$publishButton.length &&
              config.$subscribeButton.length &&
              config.$topicName.length &&
              config.$eventText.length &&
              config.wsLocation)) return false;
      
        return true;
    }
 
};
 
$( document ).ready( diagramServerTest.init );