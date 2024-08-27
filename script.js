document.getElementById('createQuote').addEventListener('click', function() {
    document.getElementById('imageSelection').style.display = 'block';
});

const images = document.querySelectorAll('.selectable-image');
let selectedImage = '';

images.forEach(image => {
    image.addEventListener('click', function() {
        selectedImage = image.src; // Ensure this is a data URI or a CORS-enabled URL
        document.getElementById('textInput').style.display = 'block';
        document.getElementById('imageSelection').style.display = 'none';
    });
});

document.getElementById('generateQuote').addEventListener('click', function() {
    const userText = document.getElementById('userText').value;
    if (userText.trim() !== '' && selectedImage !== '') {
        const quoteResult = document.createElement('div');
        quoteResult.style.backgroundImage = `url(${selectedImage})`;
        quoteResult.style.backgroundSize = 'cover';
        quoteResult.style.padding = '40px';
        quoteResult.style.color = 'white';
        quoteResult.style.borderRadius = '10px';
        quoteResult.style.display = 'flex';
        quoteResult.style.justifyContent = 'center';
        quoteResult.style.alignItems = 'center';
        quoteResult.style.height = '300px'; // Adjust as needed
        quoteResult.style.width = '600px'; // Adjust as needed
        quoteResult.style.fontSize = '24px';
        quoteResult.style.textAlign = 'center';
        quoteResult.innerHTML = `<p>${userText}</p>`;
        document.getElementById('quoteResult').innerHTML = '';
        document.getElementById('quoteResult').appendChild(quoteResult);
        document.getElementById('quoteDisplay').style.display = 'block';
        document.getElementById('textInput').style.display = 'none';

        // Adjust the canvas dimensions to match the quoteResult
        const quoteResultElement = document.getElementById('quoteResult');
        const quoteResultWidth = quoteResultElement.offsetWidth;
        const quoteResultHeight = quoteResultElement.offsetHeight;

        html2canvas(quoteResultElement, { 
            width: quoteResultWidth,
            height: quoteResultHeight,
            useCORS: true, // Enable CORS to handle cross-origin images
            scale: 2 // Improve quality of the downloaded image
        }).then(function(canvas) {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'quote.png'; // Default file name
            link.click(); // Simulate a click on the link to download the image
        }).catch(function(error) {
            console.error('Error generating canvas:', error);
        });
    }
});
