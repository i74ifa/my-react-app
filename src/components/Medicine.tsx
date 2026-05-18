import { useState } from "react";

interface medicinetype {
  id: number;
  name: string;
  price: number;
  iscompleted: boolean;
  ondelete:()=> void;
  onupdate: (newname: string, newprice: string)=> void;
}

export default function Medicine({ id, name, price, iscompleted ,ondelete, onupdate}: medicinetype) {
    const[isedit, setisedit] = useState(false);
    const[newname, setnewname]= useState(name);
    const[newprice, setnewprice] = useState<number>(price);

    const handlesave=()=>{
        onupdate(newname, newprice.toString());
        setisedit(false);
    }
    
    const handlecancel=()=>{
        setisedit(false);
    }
  return (
    <div className="w-full p-4 rounded-2xl bg-white text-black border border-indigo-100 hover:border-indigo-300 transition-all">
      <div className="flex justify-between items-center w-full">
        {isedit ? (
            // وضع التعديل
            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input className="flex-1 border-2 border-indigo-200 rounded-xl outline-none focus:border-indigo-500 p-2 transition" type="text" value={newname} onChange={(e)=>setnewname(e.target.value)} />
                <input className="flex-1 border-2 border-indigo-200 rounded-xl outline-none focus:border-indigo-500 p-2 transition" type="number" value={newprice} onChange={(e)=> setnewprice(Number(e.target.value))} />
                <button onClick={handlesave} className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition font-bold cursor-pointer">حفظ</button>
                <button onClick={handlecancel} className="px-4 py-2 rounded-xl bg-gray-400 text-white hover:bg-gray-500 transition font-bold cursor-pointer">الغاء</button>
            </div>
        ) : (
            // وضع العرض
            <>
                <div className="flex items-center gap-3">
                    <span className="text-2xl">💊</span>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-indigo-900">{name}</span>
                      <span className="text-sm text-pink-600 font-bold">
                       {price} دينار
                      </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setisedit(true)} className="px-4 py-2 rounded-xl bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition font-bold shadow-sm">تعديل</button>
                    <button onClick={ondelete} className="px-4 py-2 rounded-xl bg-red-500 text-white cursor-pointer hover:bg-red-600 transition font-bold shadow-sm">حذف</button>
                </div>
            </>
        )}
      </div>
    </div>
  );
}