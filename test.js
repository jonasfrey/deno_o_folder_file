import { O_path, f_o_path } from "./O_path.module.js";

import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";


Deno.test(
    "no leading slash",
    async () => {
        var o_path = await f_o_path("testdir/testfolder.test/./../testfile.test//////")
        console.log(o_path)
        assertEquals(o_path.s_file_name, "testfile.test");
        assertEquals(o_path.a_s_folder, ['testdir']);
        assertEquals(o_path.s_folder_name, undefined);
    }
);

// Deno.test(
//     "no leading dot but slash",
//     () => {
//         var o_path = new O_path("/dir/subdir/file")
//         assertEquals(o_path.s_folder_name, "/dir/subdir");
//         assertEquals(o_path.s_file_name, "file");
//     }
// );
// Deno.test(
//     "leading dot and slash",
//     () => {
//         var o_path = new O_path("./../dir/subdir/file")
//         assertEquals(o_path.s_folder_name, "./../dir/subdir");
//         assertEquals(o_path.s_file_name, "file");
//     }
// );

// Deno.test(
//     "two leading dots",
//     () => {
//         var o_path = new O_path("../dir/subdir/file")
//         assertEquals(o_path.s_folder_name, "../dir/subdir");
//         assertEquals(o_path.s_file_name, "file");
//     }
// );

// Deno.test(
//     "ending slash",
//     () => {
//         var o_path = new O_path("../dir/subdir/")
//         assertEquals(o_path.s_folder_name, "../dir/subdir/");
//         assertEquals(o_path.s_file_name, null);
//     }
// );

// Deno.test(
//     "folder and file with special chars",
//     () => {
//         var o_path = new O_path("./A;:,.m!@#$%^&*()\"'14!@#$/A;:,.m!@#$%^&*()\"'14!@#$")
//         assertEquals(o_path.s_folder_name, "./A;:,.m!@#$%^&*()\"'14!@#$");
//         assertEquals(o_path.s_file_name, "A;:,.m!@#$%^&*()\"'14!@#$");
//     }
// );

// Deno.test(
//     "testing folder resolution",
//     () => {
//         var o_path = new O_path("./a/b/c/d/e./f../g.../../../../../")
//         assertEquals(o_path.s_folder_name_without_singleanddoubledots, "a/b/c");
//     }
// );


// Deno.test(
//     "testing folder resolution with leading double dots",
//     () => {
//         var o_path = new O_path("/../../../././././a/b/c/d/../")
//         console.log(o_path.s_folder_name_without_singleanddoubledots)
//         assertEquals(o_path.s_folder_name_without_singleanddoubledots, "../../../a/b/c");
//     }
// );

// assertEquals(o_path.s_file_name, "file");

// //         var o_path = new O_path("./../../../././././a/b/c/d/../")
// //         console.log(o_path.s_folder_name_without_singleanddoubledots)
// //         assertEquals(o_path.s_folder_name_without_singleanddoubledots, "../../../a/b/c/");
// //     }
// // );


// Deno.test(
//     "relative file",
//     () => {
//         var o_path = new O_path("./testfile.txt")
//         console.log(o_path)
//     }
// );