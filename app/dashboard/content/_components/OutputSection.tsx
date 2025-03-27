import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface props{
  aiOutput:string;
}

function OutputSection({aiOutput}:props) {
  const editorRef:any=useRef();

  useEffect(()=>{
    const editorInstance=editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  },[aiOutput])

  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between items-center p-5'>
        <h2 className='font-medium text-lg'>Your Result</h2>
        <Button className='flex gap-2'
        onClick={()=>navigator.clipboard.writeText(aiOutput)}
        ><Copy className='w-4 h-4'/> Copy </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
        onChange={()=>console.log(editorRef.current.getInstance().getMarkdown())}
      />
    </div>
  )
}

export default OutputSection
















// import React from "react";
// import { Copy } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// interface props {
//   aiOutput: string;
// }

// function OutputSection({ aiOutput }: props) {
//   return (
//     <div className="bg-white shadow-lg border rounded-lg p-5 flex flex-col items-center">
//       <h2 className="font-medium text-lg mb-4">Your Generated Image</h2>

//       {aiOutput ? (
//         <Image
//           src={aiOutput}
//           alt="Generated Image"
//           width={500}
//           height={500}
//           className="rounded-lg shadow-md"
//         />
//       ) : (
//         <p className="text-gray-500">No image generated yet.</p>
//       )}

//       {aiOutput && (
//         <Button
//           className="flex gap-2 mt-4"
//           onClick={() => navigator.clipboard.writeText(aiOutput)}
//         >
//           <Copy className="w-4 h-4" /> Copy Image URL
//         </Button>
//       )}
//     </div>
//   );
// }

// export default OutputSection;
