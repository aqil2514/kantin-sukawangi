import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCopy, FaEdit, FaTrash } from "react-icons/fa";

type CurrentElement = React.FC<{
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  ref: React.RefObject<HTMLFormElement | null>;
}>;

export default function TableData({ value }: { value: string }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const valueRef = useRef<null | HTMLSpanElement>(null);
  const editingElementRef = useRef<null | HTMLFormElement>(null);

  const copyHandler = async () => {
    if (!valueRef.current) return;
    await navigator.clipboard.writeText(valueRef.current.innerText);
    alert("Berhasil dicopy");
  };

  return (
    <TableCell onDoubleClick={() => setIsEditing(true)} className="relative">
      <ContextMenu>
        <ContextMenuTrigger
          className="block cursor-default w-full h-full"
          ref={valueRef}
        >
          {isEditing ? `Nilai Lama : ${value}` : value}
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="text-slate-600 gap-2"
            onClick={copyHandler}
          >
            <FaCopy /> Copy Order Id
          </ContextMenuItem>
          <ContextMenuItem
            className="text-slate-600 gap-2"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit /> Edit Order Id
          </ContextMenuItem>
          {/* Ini ga bisa nih kalo makek Dialog Shadcn */}
          <ContextMenuItem className="text-red-500 gap-2">
            <FaTrash /> Hapus Data ini
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {isEditing && (
        <EditingElement
          setIsEditing={setIsEditing}
          value={value}
          ref={editingElementRef}
        />
      )}
    </TableCell>
  );
}

type Inputs = {
  oldValue: string;
  newValue: string;
};

const EditingElement: CurrentElement = ({ setIsEditing, value, ref }) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const { data: resData } = await axios.put("/api/admin/orders", data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") return setIsEditing(false);
    else if (e.ctrlKey && e.key === "Enter") return handleSubmit(onSubmit)();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setIsEditing]);

  return (
    <form
      action="post"
      ref={ref}
      onSubmit={handleSubmit(onSubmit)}
      className="absolute w-full -bottom-32 left-0 bg-slate-100 z-10 p-4 rounded-md shadow-lg"
    >
      <p>Nilai Lama : {value}</p>
      <p>Nilai Baru :</p>
      <input {...register("oldValue")} type="hidden" value={value} />
      <Textarea
        autoFocus
        {...register("newValue")}
        defaultValue={value}
        onKeyDown={keyDownHandler}
        onFocusCapture={(e) => e.target.select()}
      />
      {/* TODO : Next, lengkapin fungsi ini ajah dulu */}
      <Button
        type="button"
        className="focus:outline-none my-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={() => setIsEditing(false)}
        disabled={isLoading}
      >
        Batal
      </Button>
      {/* TODO : Next, lengkapin fungsi ini ajah dulu */}
      <Button
        disabled={isLoading}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        {isLoading ? "Mengirim Data..." :"Ubah"}
      </Button>
    </form>
  );
};
