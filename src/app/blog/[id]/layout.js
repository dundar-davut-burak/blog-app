export default function ArticleLayout({ children }) {
  return (
    <div class="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      <div class="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
        {children}
      </div>
    </div>
  );
}
