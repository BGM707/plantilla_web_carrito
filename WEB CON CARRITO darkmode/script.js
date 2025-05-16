document.addEventListener('DOMContentLoaded', () => {
    // Iniciar las animaciones AOS (Animate On Scroll) una vez que el DOM esté completamente cargado
    AOS.init();

    // Definir las variables relacionadas con el carrito de compras
    const cart = []; // Array vacío que almacenará los productos en el carrito
    const cartElement = document.getElementById('cart'); // Elemento del DOM que contiene el carrito
    const cartItemsElement = document.getElementById('cartItems'); // Elemento que mostrará los productos del carrito
    const cartCountElement = document.getElementById('cartCount'); // Contador de la cantidad total de productos
    const cartTotalElement = document.getElementById('cartTotal'); // Muestra el total a pagar por los productos
    const cartToggleBtn = document.getElementById('cartToggleBtn'); // Botón para mostrar/ocultar el carrito
    const checkoutBtn = document.getElementById('checkoutBtn'); // Botón para finalizar la compra
    const greetingElement = document.getElementById('greeting'); // Elemento para mostrar mensajes de saludo
    const welcomeElement = document.getElementById('welcome'); // Elemento para mostrar los mensajes de bienvenida

    // Definir los mensajes de bienvenida en diferentes idiomas
    const welcomeMessages = [
        "Bienvenido", "Welcome", "Bienvenue", "Willkommen", "Benvenuto",
        "ようこそ", "欢迎", "Bem-vindo", "Добро пожаловать", "환영합니다", "Akukonpayamün"
    ];
    let currentIndex = 0; // Índice que rastrea el mensaje de bienvenida actual

    // Función para cambiar el mensaje de bienvenida cada 3 segundos
    function changeWelcomeMessage() {
        welcomeElement.textContent = welcomeMessages[currentIndex]; // Actualiza el texto en el DOM
        currentIndex = (currentIndex + 1) % welcomeMessages.length; // Avanza al siguiente mensaje en el array
    }

    setInterval(changeWelcomeMessage, 3000); // Llama a changeWelcomeMessage cada 3 segundos
    changeWelcomeMessage(); // Ejecutar la función inmediatamente para mostrar el primer mensaje

    // Función para calcular el total del carrito basado en la cantidad y precio de los productos
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0); // Suma total de todos los productos
    };

    // Función para actualizar la visualización del carrito
    const updateCart = () => {
        cartItemsElement.innerHTML = ''; // Limpiar la lista de productos en el carrito
        const total = calculateTotal(); // Calcular el nuevo total

        cart.forEach((item, index) => {
            // Crear un elemento <li> para cada producto
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)} 
                <button class="remove-item" data-index="${index}">Eliminar</button>`;
            cartItemsElement.appendChild(li); // Añadir el producto al DOM
        });

        // Actualizar el contador de productos y el total del carrito
        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
        cartToggleBtn.innerHTML = `🛒 ${cartCountElement.textContent}`; // Actualizar el ícono del carrito

        // Deshabilitar el botón de finalizar compra si el carrito está vacío
        checkoutBtn.disabled = cart.length === 0;

        console.log('Cart updated:', cart); // Debug: Mostrar el estado del carrito en la consola
        console.log('Total:', total); // Debug: Mostrar el total calculado en la consola
    };

    // Función para mostrar u ocultar el carrito
    const toggleCart = () => {
        cartElement.classList.toggle('hidden'); // Añadir o quitar la clase 'hidden'
    };

    // Event listener para el botón que alterna la visualización del carrito
    cartToggleBtn.addEventListener('click', toggleCart);

    // Event listener para agregar o quitar productos del carrito
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const name = e.target.getAttribute('data-name'); // Obtener el nombre del producto
            const price = parseFloat(e.target.getAttribute('data-price')); // Obtener el precio del producto

            if (isNaN(price)) {
                console.error('Invalid price:', e.target.getAttribute('data-price')); // Mostrar error si el precio no es válido
                return;
            }

            // Verificar si el producto ya está en el carrito
            const existingItemIndex = cart.findIndex(item => item.name === name);

            if (existingItemIndex !== -1) {
                // Si el producto ya está en el carrito, aumentar la cantidad
                cart[existingItemIndex].quantity += 1;
            } else {
                // Si no está en el carrito, agregar un nuevo producto
                cart.push({ name, price, quantity: 1 });
            }

            console.log('Product added:', { name, price, quantity: 1 }); // Debug: Mostrar el producto añadido
            updateCart(); // Actualizar el carrito después de agregar el producto
        }

        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.getAttribute('data-index')); // Obtener el índice del producto a eliminar

            if (isNaN(index) || index < 0 || index >= cart.length) {
                console.error('Invalid index:', index); // Mostrar error si el índice no es válido
                return;
            }

            // Reducir la cantidad o eliminar el producto del carrito
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1; // Reducir la cantidad si es mayor a 1
            } else {
                cart.splice(index, 1); // Eliminar el producto si la cantidad es 1
            }

            console.log('Product removed at index:', index); // Debug: Mostrar el índice eliminado
            updateCart(); // Actualizar el carrito después de eliminar el producto
        }
    });

    // Event listener para redirigir a la página de pago
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
        } else {
            // Redirigir a la página de pago (Transbank o Webpay)
            window.location.href = 'https://www.transbank.cl/webpay'; // URL de ejemplo, debe ser reemplazada
        }
    });

    // Mostrar/ocultar el formulario de reserva
    const reservationForm = document.getElementById('reservationForm');
    const reserveBtn = document.getElementById('reserveBtn');
    const reserveForm = document.getElementById('reserveForm');

    reserveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        reservationForm.style.display = reservationForm.style.display === 'none' ? 'block' : 'none';
    });

    reserveForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por su reserva! Nos pondremos en contacto pronto para confirmarla.');
        reserveForm.reset(); // Limpiar el formulario después de enviar
        reservationForm.style.display = 'none'; // Ocultar el formulario
    });

    document.getElementById('openReserveBtn').addEventListener('click', () => {
        reservationForm.style.display = 'block'; // Mostrar el formulario de reserva
        reservationForm.scrollIntoView({ behavior: 'smooth' }); // Hacer scroll hacia el formulario
    });

    document.getElementById('closeFormBtn').addEventListener('click', () => {
        reservationForm.style.display = 'none'; // Ocultar el formulario de reserva
    });

    // Generación del código QR para el sitio web
    new QRCode(document.getElementById('qrcode'), {
        text: "https://ofelia-gastrobar.com", // URL que se codifica en el QR
        width: 128,
        height: 128
    });

    // Configuración del carrusel de productos
    const setupCarousel = (carouselInnerId, prevButtonId, nextButtonId) => {
        const carouselInner = document.getElementById(carouselInnerId); // Contenedor interno del carrusel
        const prevButton = document.getElementById(prevButtonId); // Botón "anterior"
        const nextButton = document.getElementById(nextButtonId); // Botón "siguiente"
        let currentIndex = 0; // Índice actual del carrusel
        const itemCount = carouselInner.children.length; // Número total de elementos en el carrusel

        // Función para actualizar la posición del carrusel
        const updateCarousel = () => {
            const offset = -currentIndex * 100; // Calcular el desplazamiento en porcentaje
            carouselInner.style.transform = `translateX(${offset}%)`; // Aplicar el desplazamiento con CSS
        };

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel(); // Mostrar el elemento anterior
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentIndex < itemCount - 1) {
                currentIndex++;
                updateCarousel(); // Mostrar el siguiente elemento
            }
        });

        // Iniciar el carrusel con el primer elemento visible
        updateCarousel();
    };

    // Configurar los carruseles de productos en la página
    setupCarousel('carouselItemsCompartir', 'prevCompartir', 'nextCompartir'); // Configuración del carrusel para compartir
    setupCarousel('carouselItemsBebestibles', 'prevBebestibles', 'nextBebestibles'); // Configuración del carrusel de bebestibles
    setupCarousel('carouselItemsClasicos', 'prevClasicos', 'nextClasicos'); // Configuración del carrusel de clásicos
});
