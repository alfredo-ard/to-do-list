"use client";
import { useState } from "react";
import { Inter } from "next/font/google";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";

type ListItem = {
    item: string;
    count: number;
};

export default function Home() {
    const [input, setInput] = useState({
        item: "",
        count: 0,
    });
    const [lists, setLists] = useState<ListItem[]>([]);

    function handleChange(e: any) {
        const { name, value } = e.target;
        setInput((p) => {
            return { ...p, [name]: value, count: 1 };
        });
    }

    function handleClick() {
        setLists((p) => {
            return [...p, input];
        });

        setInput({
            item: "",
            count: 0,
        });
    }

    function handleDelete(index: any) {
        setLists((p) => {
            return p.filter((v, i) => {
                return i !== index;
            });
        });
    }

    function handlePlus(index: any) {
        setLists((p) => {
            return p.map((v, i) => {
                return i === index ? { ...v, count: v.count + 1 } : v;
            });
        });
    }

    function handleMin(index: any) {
        setLists((p) => {
            return p.map((v, i) => {
                return i === index && v.count !== 1
                    ? { ...v, count: v.count - 1 }
                    : v;
            });
        });
    }

    const countItem = lists.reduce((ac, p) => {
        return ac + p.count;
    }, 0);

    return (
        <div className="h-[100vh] bg-slate-200 font-[inter]">
            <nav className="font-[serif] bg-teal-500 px-5 py-2 border-red-300 mb-10">
                <h1 className="font-semibold text-3xl tracking-[3px]">list</h1>
            </nav>
            <div className="w-[35%]  my-5 mx-auto">
                <form action="" className="flex align-middle justify-between">
                    <input
                        name="item"
                        type="text"
                        className="w-[90%] px-2 py-1 text-lg border border-sky-300 rounded focus:outline-none focus:ring-sky-300 focus:ring-2"
                        placeholder="What do you wanna buy.."
                        onChange={handleChange}
                        value={input.item}
                    />
                    <button
                        type="button"
                        onClick={handleClick}
                        className="text-slate-600 cursor-pointer border border-sky-600 bg-sky-300 text-xs rounded-full hover:bg-sky-600 hover:text-slate-100 shadow-md p-1 ml-3 size-10"
                    >
                        <AddIcon />
                    </button>
                </form>
            </div>

            {lists.map((list, index) => {
                return (
                    <div
                        key={index}
                        className="w-[35%]  my-5 mx-auto bg-sky-200 px-3 py-2 shadow-md  rounded flex align-middle justify-between"
                    >
                        <h2 className="text-xl text-slate-600">{list.item}</h2>

                        <div className="flex align-middle justify-evenly gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    handleMin(index);
                                }}
                                className="text-slate-600 cursor-pointer border border-sky-600 bg-sky-300 text-xs rounded-full hover:bg-sky-600 hover:text-slate-100 shadow-md p-1"
                            >
                                <RemoveIcon />
                            </button>

                            <p className="text-xl text-slate-600">
                                {list.count}
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    handlePlus(index);
                                }}
                                className="text-slate-600 cursor-pointer border border-sky-600 bg-sky-300 text-xs rounded-full hover:bg-sky-600 hover:text-slate-100 shadow-md p-1"
                            >
                                <AddIcon />
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    handleDelete(index);
                                }}
                                className="text-slate-600 cursor-pointer border border-sky-600 bg-sky-300 text-xs rounded-full hover:bg-sky-600 hover:text-slate-100 shadow-md p-1 ml-3"
                            >
                                <DeleteIcon />
                            </button>
                        </div>
                    </div>
                );
            })}

            <div className="w-full bg-teal-500 absolute bottom-0 h-20 shadow text-center p-5">
                <p className="text-xl mx-auto text-slate-600">
                    total item: {countItem}
                </p>
            </div>
        </div>
    );
}
