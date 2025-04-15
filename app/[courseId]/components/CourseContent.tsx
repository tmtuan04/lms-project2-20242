interface CourseContentProps {
  title: string;
  description: string;
  videoUrl?: string;
}

export default function CourseContent({
  title,
  description,
  videoUrl
}: CourseContentProps) {
  return (
    <div>
      <div className="p-4 flex flex-col">
        {videoUrl && (
          <div className="aspect-video relative bg-slate-200 rounded-md mb-4">
            {/* Video player component sẽ được thêm sau */}
            <div className="absolute inset-0 flex items-center justify-center">
              Video demo
            </div>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  );
}
