import {Input} from "@/components/ui/input";

type TranslationFieldsProps = {
  languages: any[];
  translations: any[];
  onUpdate: (languageId: string, field: keyof any, value: string) => void;
};

export const TranslationFields = ({languages, translations, onUpdate}: TranslationFieldsProps) => {
  return (
    <div className="grid gap-4">
      {languages.map((language) => (
        <div key={language.language._id} className="space-y-2">
          <div className="text-sm font-medium">
            {language.language.name} - {language.language.shortName}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium min-w-[100px]">Title (*)</span>
            <Input
              required
              defaultValue={
                translations.find((t) => t.language === language.language._id)?.title || ""
              }
              placeholder="Title (*)"
              onChange={(e) => onUpdate(language.language._id, "title", e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium min-w-[100px]">Description</span>
            <Input
              defaultValue={
                translations.find((t) => t.language === language.language._id)?.description || ""
              }
              placeholder="Description"
              onChange={(e) => onUpdate(language.language._id, "description", e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
