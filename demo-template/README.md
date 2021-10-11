# Quantcast / Demo HTML Template

Improved HTML template for presenting creative previews.

## Usage

- Download template **[here](./demo.html)**.
- Edit creatives list inside the `AD_LIST` array.
	```js
	var AD_LIST = [
  	// Add creative here, edit width and height
  	{ name: 'CREATIVE NAME', url: 'PATH_TO_HTML', height: 600, width: 300 }
	```
- Set the value of `AD_INIT` to the name of the creative to show on first load.
If an invalid name is entered, it will load the first one on the list.
