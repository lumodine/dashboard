"use client";

import {toast} from "react-toastify";
import {Plus, Tag, Trash} from "lucide-react";
import {useState} from "react";
import {NotFound} from "@/components/common/error";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import createProduct from "@/actions/product/createProduct";
import {SubmitButton} from "@/components/common/submit-button";

export type CreateProductFormProps = {
  tenant: any;
  category: any;
  tags: any[];
};

export const CreateProductForm = ({tenant, category, tags}: CreateProductFormProps) => {
  const [otherTags, setOtherTags] = useState<any[]>([]);

  const [addableTags, setAddableTags] = useState<any[]>(tags || []);
  const [newTagId, setNewTagId] = useState<string>();

  const removeTag = (tag: any) => {
    let tempOtherTags = [...otherTags];

    tempOtherTags = tempOtherTags.filter((tempOtherTag) => tempOtherTag._id !== tag._id);

    setOtherTags(tempOtherTags);

    let tempAddableTags = [...addableTags];

    tempAddableTags.push(tag);

    setAddableTags(tempAddableTags);

    setNewTagId("");
  };

  const addNewTag = () => {
    if (!newTagId) {
      return;
    }

    const tag = addableTags.find((addableTag) => addableTag._id === newTagId);

    let tempAddableTags = [...addableTags];

    tempAddableTags = tempAddableTags.filter((tempAddableTag) => tempAddableTag._id !== tag._id);

    setAddableTags(tempAddableTags);

    let tempOtherTags = [...otherTags];

    tempOtherTags.push(tag);

    setOtherTags(tempOtherTags);

    setNewTagId("");
  };

  const clientAction = async (formData: FormData) => {
    const response = await createProduct(tenant._id, category._id, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  };

  return (
    <form action={clientAction} className="flex flex-col gap-4">
      {tenant.languages.map((language: any, languageIndex: number) => (
        <Input
          key={languageIndex}
          defaultValue={language.language._id}
          name="languages"
          type="hidden"
        />
      ))}
      {tenant.currencies.map((currency: any, currencyIndex: number) => (
        <Input
          key={currencyIndex}
          defaultValue={currency.currency._id}
          name="currencies"
          type="hidden"
        />
      ))}

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Title (*)</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => (
            <div key={languageIndex}>
              <Label htmlFor={`titles-${language.language._id}`}>
                {language.language.name} - {language.language.shortName} (*)
              </Label>
              <Input required id={`titles-${language.language._id}`} name="titles" type="text" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Description</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => (
            <div key={languageIndex}>
              <Label htmlFor={`descriptions-${language.language._id}`}>
                {language.language.name} - {language.language.shortName}
              </Label>
              <Input id={`descriptions-${language.language._id}`} name="descriptions" type="text" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Price</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.currencies.map((currency: any, currencyIndex: number) => (
            <div key={currencyIndex}>
              <Label htmlFor={`amounts-${currency.currency._id}`}>
                {currency.currency.code} - {currency.currency.symbol}
              </Label>
              <Input
                id={`amounts-${currency.currency._id}`}
                name="amounts"
                step={0.00000000000000000000000000000001}
                type="number"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Tags</Label>
        </div>
        <div className="flex flex-col gap-2">
          {otherTags.length === 0 && <NotFound title="You have not added any tags. Add one now." />}

          {addableTags.length > 0 && (
            <div className="flex items-center gap-2">
              <Button type="button" onClick={addNewTag}>
                <Plus size={14} />
              </Button>
              <Select onValueChange={(value) => setNewTagId(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {addableTags.map((tag: any, tagIndex: number) => (
                    <SelectItem key={tagIndex} value={tag._id}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`rounded-full bg-primary w-3 h-3 theme-${tag.theme?.color}`}
                        />
                        <Tag className="inline-block" size={14} />{" "}
                        <b>{tag.translations[0].title}</b>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {otherTags.map((tag: any, tagIndex: number) => (
            <div
              key={tagIndex}
              className="flex justify-between items-center gap-3 p-2 border rounded-lg"
            >
              <Input defaultValue={tag._id} name="tags" type="hidden" />
              <div className="flex gap-2 items-center">
                <div className={`rounded-full bg-primary w-3 h-3 theme-${tag.theme?.color}`} />
                <Tag className="inline-block" size={16} /> <b>{tag.translations[0].title}</b>
              </div>
              <Button type="button" variant={"destructive"} onClick={() => removeTag(tag)}>
                <Trash size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <span className="text-xs">(*) Required field</span>
      <SubmitButton>
        <Plus /> Create product
      </SubmitButton>
    </form>
  );
};
CreateProductForm.displayName = "CreateProductForm";
