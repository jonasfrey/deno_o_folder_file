import { O_folder_file } from "./O_folder_file.module.js";

import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";


Deno.test(
    "no leading slash",
    () => {
        var o_folder_file = new O_folder_file("dir/subdir/file")
        assertEquals(o_folder_file.s_folder_name, "dir/subdir");
        assertEquals(o_folder_file.s_file_name, "file");
    }
);

Deno.test(
    "no leading dot but slash",
    () => {
        var o_folder_file = new O_folder_file("/dir/subdir/file")
        assertEquals(o_folder_file.s_folder_name, "/dir/subdir");
        assertEquals(o_folder_file.s_file_name, "file");
    }
);
Deno.test(
    "leading dot and slash",
    () => {
        var o_folder_file = new O_folder_file("./../dir/subdir/file")
        assertEquals(o_folder_file.s_folder_name, "./../dir/subdir");
        assertEquals(o_folder_file.s_file_name, "file");
    }
);

Deno.test(
    "two leading dots",
    () => {
        var o_folder_file = new O_folder_file("../dir/subdir/file")
        assertEquals(o_folder_file.s_folder_name, "../dir/subdir");
        assertEquals(o_folder_file.s_file_name, "file");
    }
);

Deno.test(
    "ending slash",
    () => {
        var o_folder_file = new O_folder_file("../dir/subdir/")
        assertEquals(o_folder_file.s_folder_name, "../dir/subdir/");
        assertEquals(o_folder_file.s_file_name, null);
    }
);

Deno.test(
    "folder and file with special chars",
    () => {
        var o_folder_file = new O_folder_file("./A;:,.m!@#$%^&*()\"'14!@#$/A;:,.m!@#$%^&*()\"'14!@#$")
        assertEquals(o_folder_file.s_folder_name, "./A;:,.m!@#$%^&*()\"'14!@#$");
        assertEquals(o_folder_file.s_file_name, "A;:,.m!@#$%^&*()\"'14!@#$");
    }
);

Deno.test(
    "testing folder resolution",
    () => {
        var o_folder_file = new O_folder_file("./a/b/c/d/e./f../g.../../../../../")
        assertEquals(o_folder_file.s_folder_name_without_singleanddoubledots, "a/b/c");
    }
);


Deno.test(
    "testing folder resolution with leading double dots",
    () => {
        var o_folder_file = new O_folder_file("/../../../././././a/b/c/d/../")
        console.log(o_folder_file.s_folder_name_without_singleanddoubledots)
        assertEquals(o_folder_file.s_folder_name_without_singleanddoubledots, "../../../a/b/c");
    }
);


// Deno.test(
//     "testing folder resolution with leading double dots",
//     () => {
//         var o_folder_file = new O_folder_file("./../../../././././a/b/c/d/../")
//         console.log(o_folder_file.s_folder_name_without_singleanddoubledots)
//         assertEquals(o_folder_file.s_folder_name_without_singleanddoubledots, "../../../a/b/c/");
//     }
// );
