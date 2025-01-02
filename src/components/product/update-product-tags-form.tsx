"use client";

import {Plus, Save, Tag, Trash} from "lucide-react";
import {useState} from "react";
import {toast} from "react-toastify";
import {SubmitButton} from "@/components/common/submit-button";
import {NotFound} from "@/components/common/error";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import updateProductTags from "@/actions/product/updateProductTags";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";

export type UpdateProductTagsFormProps = {
  tenant: any;
  product: any;
  tags: any[];
};

export const UpdateProductTagsForm = ({tenant, product, tags}: UpdateProductTagsFormProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const _productTags = tags?.filter((tag) =>
    product.parentItems.some((productTag: any) => productTag._id === tag._id),
  );

  const _addableTags = tags?.filter(
    (tag) => !_productTags.some((productTag: any) => productTag._id === tag._id),
  );

  const [otherTags, setOtherTags] = useState<any[]>(_productTags || []);

  const [addableTags, setAddableTags] = useState<any[]>(_addableTags || []);
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

  const clientAction = async () => {
    const response = await updateProductTags(tenant._id, product._id, otherTags);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  return (
    <form action={clientAction} className="flex flex-col gap-4">
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
                      <Tag className="inline-block" size={14} /> <b>{tag.translations[0].title}</b>
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

      <SubmitButton>
        <Save /> Save
      </SubmitButton>
    </form>
  );
};
UpdateProductTagsForm.displayName = "UpdateProductTagsForm";
