# also checkout the test.js
```javascript

var o_folder_file = new O_folder_file('/tmp')
console.log(o_folder_file.s_file_name) // tmp

var o_folder_file = new O_folder_file('/test.txt')
console.log(o_folder_file.s_file_name) // test.txt
console.log(o_folder_file.s_file_extension) // txt
console.log(o_folder_file.o_mime_type_guessed_by_file_extension.s_mime_type) // text/plain


var o_folder_file = new O_folder_file('./this/is/a/folder/')
console.log(o_folder_file.s_file_name) // null
console.log(o_folder_file.s_file_extension) // null
console.log(o_folder_file.s_folder_name) // './this/is/a/folder/ 
console.log(o_folder_file.o_mime_type_guessed_by_file_extension.s_mime_type) // text/plain

var o_folder_file = new O_folder_file('./a/b/c/../../2/')
console.log(o_folder_file.s_folder_name) // ./a/b/c/../../2/
console.log(o_folder_file.s_folder_name_without_singleanddoubledots) // /a/2/

```
