import { estimateTokens } from "@/lib/utils";

type TokenInfoProps = {
    text: string;
};

export default function TokenInfo({ text }: TokenInfoProps) {
    const estimatedTokens = estimateTokens(text);

return (
   <>
      <div className="mt-2 flex gap-4 text-xs text-gray-500">
        <p>Characters: {text.length}</p>
        <p>Estimated Tokens: {estimatedTokens}</p>
      </div>

      {estimatedTokens > 1500 && (
        <p className="mt-2 text-xs text-orange-600">
          Warning: This input is getting long. The app may trim or limit text later.
        </p>
      )}
    </> 
);
}