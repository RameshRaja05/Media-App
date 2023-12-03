import classNames from "classnames"


type SkeletonProps={
    times:number;
    className?:string;
    isHorizontal?:boolean
}
function Skeleton({times,className,isHorizontal}:SkeletonProps) {
  
  const outerClassNames=classNames(
    "relative",
    "overflow-hidden",
    "bg-gray-200",
    "rounded",
    "mb-2.5",
    className
  );
  const innerClassNames=classNames(
    "animate-shimmer",
    "absolute",
    "inset-0",
    "-translate-x-full",
    "bg-gradient-to-r",
    "from-gray-200",
    "via-white",
    "to-gray-200"
  );

  const boxes=Array(times).fill('he').map((_,i)=>{
    return <div key={i} className={outerClassNames}>
      <div className={innerClassNames}/>
    </div>
  })
  return (
    <div className={isHorizontal?"flex flex-row justify-center content-start":''}>{boxes}</div>
  )
}

export default Skeleton