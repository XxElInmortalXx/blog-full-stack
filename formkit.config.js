import { generateClasses } from "@formkit/themes";

const config = {
  config: {
    classes: generateClasses({
        global:{
            // main
            outer: "",
            wrapper: "",
            inner: "",
            label: "block font-medium mt-1",
            input: "block w-full rounded-md border-neutral-500 border-2 p-2 text-neutral-800 resize-[content]",
            help: "",
            messages: "",
            message: "block w-full text-red-500 text-sm text-center mt-1 py-1 rounded-md bg-red-100",
            // secondary
            fieldset: "",
            legend: "",
            // input selection
            options:"",
            option:"",
            optionHelp: "",
            // icons
            decorator: "",
            decoratorIcon: "",
            // specific
            selectIcon: "",
            // input file
            fileList: "",
            fileItem: "",
            fileItemIcon: "",
            fileName: "hidden",
            fileRemove: "hidden",
            noFiles: "block w-full bg-neutral-500 text-neutral-50 font-medium rounded-md px-2 py-1 mr-2 mt-1 mb-2",
            noFilesIcon: "",
            fileRemoveIcon: ""
        },
        submit:{
            input: "$reset block w-full bg-neutral-800 text-neutral-50 text-center tex-lg hover:bg-neutral-700 font-medium rounded-md px-2 py-2 mt-2 disabled:cursor-not-allowed disabled:bg-neutral-500 disabled:text-neutral-300",
            message: "$reset block w-full bg-red-800 text-red-50 text-center tex-lg font-medium rounded-md px-2 py-2 mt-2"
        }
    }),
  },
};

export default config;