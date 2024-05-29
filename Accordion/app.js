// Select all the elements matching the selector
document.querySelectorAll('.box .toggle i').forEach(function(icon) {
    // Add a click event listener to each element
    icon.addEventListener('click', function() {
        // Find the closest parent element with the class 'toggle'
        let toggle = this.closest('.toggle');
        if (toggle) {
            // Find the child element with the class 'text'
            let text = toggle.querySelector('.text');
            if (text) {
                if (text.classList.contains('open')) {
                    text.style.height = `${text.scrollHeight}px`; // Set the height to the scroll height for the transition
                    requestAnimationFrame(() => {
                        text.style.height = '0px';
                        text.classList.remove('open');
                    });
                } else {
                    text.style.height = '0px'; // Set the height to 0 for the transition
                    requestAnimationFrame(() => {
                        text.style.height = `${text.scrollHeight}px`; // Set the height to the scroll height for the transition
                        text.classList.add('open');
                    });
                }
            }
        }

        // Toggle the 'togglejs' class on the clicked element
        this.classList.toggle('togglejs');
    });
});
