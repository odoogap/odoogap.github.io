$(function() {
    var anim = false;
    function typed(finish_typing) {
        return function(term, message, delay, finish) {
            anim = true;
            var prompt = decodeURIComponent("guest@prompt-equation:~$ ");
            var c = 0;
            if (message.length > 0) {
                term.set_prompt("");
                var interval = setInterval(function() {
                    term.insert(message[c++]);
                    if (c == message.length) {
                        clearInterval(interval);
                        setTimeout(function() {
                            finish_typing(term, message, prompt);
                            anim = false;
                            finish && finish();
                        }, delay);
                    }
                }, delay);
            }
        };
    }

    var typed_message = typed(function(term, message, prompt) {
        term.set_command("");
        term.echo(message)
        term.set_prompt(prompt);
    });

    var command_text = function(text){
        return "[[;#33D633;]" + text + "]";
    }

    $("body").terminal(function(cmd, term) {
        switch (cmd) {
            case "ls":
                term.echo("\n"+ command_text("about") + "          Our philosophy\n" 
                + command_text("technologies") + "   What we like to work with\n" 
                + command_text("poeple") + "         Our team\n"
                + command_text("products") + "       What we are working on\n"
                + command_text("clear") + "          Clear terminal\n");
                break;
            case "clear":
                term.clear();
                break;
            case "":
                term.echo("");
                break;
            default:
                term.echo(cmd + ": command not found");
                break;
        }
    }, {
        greetings: null,
        width: $(window).width(),
        height: 300,
        onInit: function(term) {
            var msg = "Welcome.\n";
            typed_message(term, msg, 20, function() {
            });
        },
        keydown: function(e) {
            if (anim) {
                return false;
            }
        }
    });
});