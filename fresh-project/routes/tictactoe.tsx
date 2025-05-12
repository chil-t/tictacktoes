import TicTacToe from "../islands/TicTacToe.tsx";

export default function TicTacToePage() {
  return (
    <div class="px-4 py-8 mx-auto bg-[#f0f4f8]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <TicTacToe />
        <div class="mt-8">
          <a href="/" class="text-blue-500 hover:underline">← Back to home</a>
        </div>
      </div>
    </div>
  );
}
