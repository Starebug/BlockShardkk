import React from "react";
const Map = ({pin}) => {
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'Kb', 'Mb', 'Gb', 'Tb'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat(bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
      }      
      function format_pin_hash(hash) {
        var s = '';
        s = s+ hash.slice(0,4);
        s = s+ '....';
        s = s + hash.slice(hash.length-4, hash.length);
        return s;   
        }
    return(
            <div className=" flex text-white w-[96%] h-[80px] justify-start items-center border-2 rounded-3xl pt-5">
                <div className="flex flex-col w-[50%] ">
                    <div className="h-[50px] mb-[-20px] ">
                        {pin.metadata.name}
                    </div>
                    <div className="">
                        {formatFileSize(pin.size)}
                    </div>
                </div>
                <div className="flex">
                    <div className="">
                    {format_pin_hash(pin.ipfs_pin_hash)}
                    </div>
                    <div className="">
                        <a href=''>
                            <img src="../public/copy.png" alt="image"></img>
                        </a>
                    </div>
                    
                </div>
            </div>
    );
}
export default Map;