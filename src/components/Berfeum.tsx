import { useState } from "react";

// 1. تـعـريـف الـ Props الـجـايـة مـن الـأب (تـشـمـل كـل تـفـاصـيـل الـعـطـر)
interface PerfumeType {
    id: number;
    name: string;
    type: string;
    family: string;
    price: number;
    season: string; // صيفي أو شتوي
    iscompleted: boolean;
    onDelete: () => void;
    onUpdate: (newName: string, newPrice: string, newSeason: string) => void;
}

export default function PerfumeItem({ id, name, type, family, price, season, onDelete, onUpdate }: PerfumeType) {
    const [isEdit, setIsEdit] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newPrice, setNewPrice] = useState<number>(price);
    const [newSeason, setNewSeason] = useState(season); // ستيت لتعديل الفصل أيضاً

    // دالة الحفظ عند إنهاء التعديل
    const handleSave = () => {
        onUpdate(newName, newPrice.toString(), newSeason);
        setIsEdit(false);
    };

    // دالة إلغاء التعديل
    const handleCancel = () => {
        setIsEdit(false);
        // إرجاع القيم الأصلية في حال ألغينا
        setNewName(name);
        setNewPrice(price);
        setNewSeason(season);
    };

    return (
        <div className="w-full p-4 rounded-2xl bg-white text-black border border-purple-100 hover:border-purple-300 transition-all shadow-sm">
            <div className="flex justify-between items-center w-full">

                {isEdit ? (
                    // 🛠️ أولاً: وضـع الـتـعـديـل (إذا چان الـ سويتش شغال)
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-col sm:flex-row gap-2 w-full">
                            <input
                                className="flex-1 border-2 border-pink-200 rounded-xl outline-none focus:border-pink-500 p-2 transition text-sm"
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="اسم العطر"
                            />
                            <input
                                className="flex-1 border-2 border-pink-200 rounded-xl outline-none focus:border-pink-500 p-2 transition text-sm"
                                type="number"
                                value={newPrice}
                                onChange={(e) => setNewPrice(Number(e.target.value))}
                                placeholder="السعر"
                            />

                            {/* قائمة منسدلة لتعديل الفصل داخل البطاقة */}
                            <select
                                value={newSeason}
                                onChange={(e) => setNewSeason(e.target.value)}
                                className="border-2 border-pink-200 rounded-xl outline-none focus:border-pink-500 p-2 text-black bg-white transition text-sm cursor-pointer"
                            >
                                <option value="صيفي">☀️ صيفي</option>
                                <option value="شتوي">❄️ شتوي</option>
                            </select>
                        </div>

                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={handleSave}
                                className="px-4 py-1.5 rounded-xl bg-green-600 text-white hover:bg-green-700 transition font-bold text-xs cursor-pointer"
                            >
                                حفظ
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-1.5 rounded-xl bg-gray-400 text-white hover:bg-gray-500 transition font-bold text-xs cursor-pointer"
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                ) : (
                    // 🌸 ثـانـيـاً: وضـع الـعـرض الـعـادي
                    <>
                        <div className="flex items-center gap-3">
                            {/* تطلع أيقونة شمس أو ثلج حسب نوع العطر المختار تلقائياً */}
                            <span className="text-2xl">{season === "صيفي" ? "☀️" : "❄️"}</span>

                            <div className="flex flex-col">
                                <span className="text-base font-bold text-pink-900">{name}</span>

                                {/* عرض تفاصيل العطر (النوع والعائلة) بنعومة */}
                                <span className="text-xs text-gray-400">
                                    {type} {family && `• عائلة الـ${family}`}
                                </span>

                                <span className="text-xs text-pink-600 font-bold mt-0.5">
                                    {price.toLocaleString()} دينار
                                </span>
                            </div>
                        </div>

                        {/* أزرار التحكم بالبطاقة */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEdit(true)}
                                className="px-3 py-1.5 rounded-xl bg-purple-100 text-pink-700 cursor-pointer hover:bg-purple-200 transition font-bold text-xs shadow-sm"
                            >
                                تعديل
                            </button>
                            <button
                                onClick={onDelete}
                                className="px-3 py-1.5 rounded-xl bg-red-500 text-white cursor-pointer hover:bg-red-600 transition font-bold text-xs shadow-sm"
                            >
                                حذف
                            </button>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}