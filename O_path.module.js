import { a_o_mime_type_most_common } from "./a_o_mime_type_most_common.js"

import {f_a_o_path_file_stack_trace} from "./f_a_o_path_file_stack_trace.module.js"

class O_path{

    constructor(
        s
    ){
        this.s = s; 
        this.o_path_absolute = null;
        this.s_separator_guessed = this.f_s_separator_guessed(s)
        this.b_absolute = (s.indexOf(this.s_separator_guessed) == 0)

        if(this.b_absolute){
            this.o_path_absolute = this;// assuming path is absolute example: /home/username/test.txt
        }else{
            this.s_relative = s; 
            // try to generate absolute path 
            var o_path_file_from_which_this_has_been_instantiated = f_a_o_path_file_stack_trace().slice(2)[0]
            // console.log(o_path_file_from_which_this_has_been_instantiated)
            var s_path_absolute = o_path_file_from_which_this_has_been_instantiated.s_path_name + this.s_separator_guessed + this.s_relative;
            // console.log(s_path_absolute)
            this.o_path_absolute = new O_path(s_path_absolute);
        }

        this.s_windows_drive_letter = null
        this.s_file_extension = null
        this.s_file_extension_separator = '.'
        this.s_folder_name_without_singleanddoubledots = ''
        this.o_mime_type_guessed_by_file_extension = null
        this.f_update_all()
        //official mime/content types
        // https://www.iana.org/assignments/media-types/application.csv
        // https://www.iana.org/assignments/media-types/media-types.xhtml
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

    }

    f_s_separator_guessed(s){
        // detect separator 
        var s_dir_separator = '/'
        var a_s = Array.from(s)
        var n_count_backslash = a_s.filter(s=>s=='\\').length
        var n_count_slash = a_s.filter(s=>s=='/').length 
        if(n_count_backslash > n_count_slash){
            s_dir_separator = '\\'
        }
        return s_dir_separator;
    }

    f_b_file_guessed(){
        var b_is_file = true
        if(this.s[this.s.length-1] == this.s_separator_guessed){
            console.warn(`${this.s} is not a locator to a file but only to a folder because it ends with a dir separator (${this.s_separator_guessed})`)
            b_is_file = false
        }
        return b_is_file
    }

    f_update_all(){

        this.s_folder_name_without_singleanddoubledots = this.f_s_path_without_single_and_double_points(this.s);
        var a_s_part = this.s_folder_name_without_singleanddoubledots.split(this.s_separator_guessed)

        if(a_s_part.slice(-1)[0] == ""){
            a_s_part.pop()
        }
        this.s_folder_name_without_singleanddoubledots_without_ending_slash = a_s_part.join(this.s_separator_guessed)

        this.a_s_folderorfile = a_s_part

        
        this.b_folder_guessed = (!this.o_stat && this.s_folder_name_without_singleanddoubledots.endsWith("/"))
        this.b_file_guessed = !this.b_folder_guessed

        if(this.o_stat){
            if(this.o_stat.isDirectory){
                this.a_s_folder = this.a_s_folderorfile.slice()
                this.s_folder_name = this.a_s_folder.slice(-1)[0]
            }else{
                this.a_s_folder = this.a_s_folderorfile.slice(0,-1)
                this.s_file_name = this.a_s_folderorfile.slice(-1)[0]
            }
        }

        if(!this.o_stat){
            if(this.b_folder_guessed){
                this.a_s_folder = this.a_s_folderorfile.slice()
                this.s_folder_name = this.a_s_folder.slice(-1)[0]
            }
            if(this.b_file_guessed){
                this.a_s_folder = this.a_s_folderorfile.slice(0,-1)
                this.s_file_name = this.a_s_folderorfile.slice(-1)[0]
            }
        }


        // var a_s_part = this.s.split(this.s_separator_guessed) // 

        // // ./../../././a/b//////

        // var s_file_name = a_s_part[a_s_part.length-1]
        // if(s_file_name == "." || s_file_name == ".."){
        //     console.warn(`${this.s} is not a locator to a file but only to a folder because it ends with one or two dots (${s_file_name})`)
        //     b_is_file = false
        // }

        // if(b_is_file){
                
        //     this.s_file_name = a_s_part.pop()
        //     if(this.s_file_name.includes(this.s_file_extension_separator)){
        //         this.s_file_extension = this.s_file_name.split(this.s_file_extension_separator).pop()
                
        //         this.o_mime_type_guessed_by_file_extension = a_o_mime_type_most_common.filter(
        //             o => o.s_file_extension.split(' ').includes("."+this.s_file_extension)
        //             )[0]
        //             // console.log(this.o_mime_type_guessed_by_file_extension)
        //         }
        // }

        // if(this.s_separator_guessed == '\\'){
        //     if(a_s_part[0].includes(':')){
        //         this.s_windows_drive_letter = a_s_part.shift()
        //     }
        // }
        

    }
    
    async f_deno_stat(){
        try {
            // console.log(this.o_path_absolute.s)
            // deno.stat does not work with ending slash /path/to/folder/
            this.o_stat = await Deno.stat(this.s_folder_name_without_singleanddoubledots_without_ending_slash);

        } catch (error) {
            this.o_stat = undefined;
        }
        

        this.f_update_all()
    }
    

    f_s_path_without_single_and_double_points(s, s_separator = this.s_separator_guessed){
        var a_s_part = s.split(s_separator)
        // aka resolved path
        // /1/a/../b/../c/lol/.. -> /1/c/
        // /.././../a/b/c/ -> /../../a/b/c/
        var a_s_folder_part = []
        // var s = a_s_part.join(this.s_separator_guessed)
        // s = s.replaceAll(this.s_separator_guessed+'.'+this.s_separator_guessed, '')
        // var a_s_part = s.split(this.s_separator_guessed)
        for(var n_index in a_s_part){
            var s_part = a_s_part[n_index]
            if(s_part == '.' || s_part == ""){
                if(n_index != a_s_part.length-1){
                    continue
                }
            }
            if(s_part == ".."){
                if( a_s_folder_part.filter(s=>s != '..').length > 0){
                    a_s_folder_part.pop()
                    continue
                }else{
                    a_s_folder_part.push(s_part)
                    continue
                }

            }
                
            
            a_s_folder_part.push(s_part)

        }

        return a_s_folder_part.join(this.s_separator_guessed)
    }
}


var f_o_path = async function(s){
    var o_path = new O_path(s)
    await o_path.f_deno_stat();
    return o_path
}
export {O_path, f_o_path}