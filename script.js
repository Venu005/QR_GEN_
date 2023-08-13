
document.addEventListener('DOMContentLoaded', () => {
  const qrForm = document.querySelector('#url-form');
  if (qrForm) { // Check if the form exists on the page
    const qrImage = document.querySelector('.image-item');
    const qrBox = document.querySelector('.qr-box');
    const qrSubtext = document.querySelector('.qr-subtext');
  
    qrForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const urlInput = document.querySelector('#url-input');
      const url = urlInput.value;
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  if (!urlPattern.test(url)) {
    // Display an error message for invalid URL
    qrSubtext.innerHTML = '<h5 style="color: red;">Please enter a valid URL.</h5>';
    return;
  }
  
      try {
        const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=200x200`, {
          method: 'GET'
        });
  
        if (response.ok) {
          qrImage.src = URL.createObjectURL(await response.blob());
          qrBox.style.display = 'block'; // Show the QR box
          qrSubtext.style.display = 'none'; // Hide the subtext
        } else {
          console.error('QR code generation failed');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });
  }
});

