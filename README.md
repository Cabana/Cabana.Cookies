# Cabana.Cookies

Reusable cookie notification bar plugin 

## Usage

1. Add the following markup
  
  ```
    <section class="your-class" data-notification="accept-cookies">
        <p>
            Vi samler statistik ved hjælp af cookies for at forbedre brugeroplevelsen.&nbsp;<a href="#">Læs mere om cookies</a>
        </p>
        <a id="accept-cookies" href="#" data-notification-set="true" data-notification-interval="30">Acceptér cookies</a>
    </section>
  ```
  
2. Iniatialize plugin on your cookie notification

   ```javascript 
    	$(".your-class").CabanaCookies({
    		content: ".element-to-be-pushed-down-by-cookie-bar"
    	});
    ```
