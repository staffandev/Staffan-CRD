// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
bar = "";
bar2 = "";
bar3 = "";
bar4 = "";

$(document).ready(function() {
    var options = [{
        selector: '#resume',
        offset: 0,
        callback: activateBars
    }];

    $(function() {
        var win = $(window);
        win.scroll(function() {
            if (win.scrollTop() >= 0) {
                triggerScrollfire();
            }
        });
    });

    function triggerScrollfire() {
        Materialize.scrollFire(options);
    }
});

function activateBars() {
    bar = new ProgressBar.Circle(container1, {
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 5,
        duration: 1400,
        easing: 'bounce',
        strokeWidth: 7,
        from: { color: '#FFEA82', a: 0 },
        to: { color: '#263d62', a: 1 },
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value + "%");
            }
        }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
    bar.animate(0.8); // Number from 0.0 to 1.0

    bar2 = new ProgressBar.Circle(container2, {
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 5,
        duration: 1400,
        easing: 'bounce',
        strokeWidth: 7,
        from: { color: '#FFEA82', a: 0 },
        to: { color: 'rgb(140, 50, 16)', a: 1 },
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value + "%");
            }
        }
    });
    bar2.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar2.text.style.fontSize = '2rem';
    bar2.animate(0.7); // Number from 0.0 to 1.0

    bar3 = new ProgressBar.Circle(container3, {
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 5,
        duration: 1400,
        easing: 'bounce',
        strokeWidth: 7,
        from: { color: '#FFEA82', a: 0 },
        to: { color: 'rgb(175, 112, 89)', a: 1 },
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value + "%");
            }
        }
    });

    bar3.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar3.text.style.fontSize = '2rem';
    bar3.animate(0.8); // Number from 0.0 to 1.0

    bar4 = new ProgressBar.Circle(container4, {
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 5,
        duration: 1400,
        easing: 'bounce',
        strokeWidth: 7,
        from: { color: '#FFEA82', a: 0 },
        to: { color: 'rgb(214, 222, 155)', a: 1 },
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value + "%");
            }
        }
    });
    bar4.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar4.text.style.fontSize = '2rem';
    bar4.animate(0.7); // Number from 0.0 to 1.0a
}