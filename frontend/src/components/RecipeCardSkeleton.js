const RecipeCardSkeleton = () => {
  return (
    <div className="border shadow rounded-md p-4 min-w-[370px] w-[370px] px-8 py-6">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="grid grid-cols-6 gap-4">
            <div className="h-2 bg-slate-200 rounded col-span-5"></div>
          </div>

          <div className="h-2 bg-slate-200 rounded"></div>
          <div className="h-2 bg-slate-200 rounded"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          </div>

          <div className="h-9 bg-slate-200 rounded w-5/12"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardSkeleton;
