function initBlockScript() {

    // Selecciona todas las cartas de memoria
    var cards = document.querySelectorAll('.memory-card');
    
    // Variables para controlar el estado del juego
    var hasFlippedCard = false;
    var lockBoard = false;
    var firstCard, secondCard;
    
    // Función para voltear una carta
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        
        this.classList.add('flip');
        
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
        
            return;
        }
        
        secondCard = this;
        checkForMatch();
    }
    
    // Función para verificar si las cartas coinciden
    function checkForMatch() {
        var isMatch = firstCard.dataset.group === secondCard.dataset.group;
        
        isMatch ? disableCards() : unflipCards();
    }
    
    // Función para deshabilitar las cartas coincidentes
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        resetBoard();
    }
    
    // Función para voltear las cartas que no coinciden
    function unflipCards() {
        lockBoard = true;
        
        setTimeout(function() {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
        
            resetBoard();
        }, 1500);
    }
    
    // Función para reiniciar el estado del tablero
    function resetBoard() {
        hasFlippedCard = false;
        lockBoard = false;
        firstCard = null;
        secondCard = null;
    }
    
    // Función para barajar las cartas
    (function shuffle() {
        cards.forEach(function(card) {
            var randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    })();
    
    // Agrega un evento de clic a cada carta
    cards.forEach(function(card) {
        card.addEventListener('click', flipCard);
    });
}

// Agrega un evento de carga para iniciar el script después de que se cargue la página
if (window.addEventListener) {
    window.addEventListener('load', initBlockScript);
} else {
    window.attachEvent('onload', initBlockScript);
}
