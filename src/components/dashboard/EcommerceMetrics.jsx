
export default function EcommerceMetrics() {
  return (
    <ul className="scrollbar-mess flex items-center gap-4 pb-1 flex-nowrap overflow-x-auto sm:flex-wrap 
       lg:flex-nowrap lg:overflow-x-auto phone:justify-center">
      <li className="min-h-[170px] min-w-[135px] max-w-[135px] cursor-pointer
                place-content-center rounded-lg bg-[#9aabab47] p-2 phone:grow">
        <img
          src="https://media.fluentez.com/uploads/uploads/3bH3aLx2ML5ID_Pt7wNz3.webp"
          alt="Grammar"
          className="pointer-events-none mx-auto select-none"
          loading="lazy" />
        <h2
          className="select-none dark:text-[#e8e8ea] text-center font-body text-sm font-semibold phone:text-base">
          Grammar
        </h2>
      </li>
      <li className="min-h-[170px] min-w-[135px] max-w-[135px] cursor-pointer
                place-content-center rounded-lg bg-[#9aabab47] p-2 phone:grow">
        <img
          src="https://media.fluentez.com/uploads/uploads/eY5kAHCvvrWSWQVvIKXYO.webp"
          alt="Listening"
          className="pointer-events-none mx-auto select-none"
          loading="lazy" />
        <h2
          className="select-none dark:text-[#e8e8ea] text-center font-body text-sm font-semibold phone:text-base">
          Listening
        </h2>
      </li>
      <li className="min-h-[170px] min-w-[135px] max-w-[135px] cursor-pointer
                place-content-center rounded-lg bg-[#9aabab47] p-2 phone:grow">
        <img
          src="https://media.fluentez.com/uploads/uploads/VVghU8GJNfhOe5Qx9pHLE.webp"
          alt="Reading"
          className="pointer-events-none mx-auto select-none"
          loading="lazy" />
        <h2
          className="select-none dark:text-[#e8e8ea] text-center font-body text-sm font-semibold phone:text-base">
          Reading
        </h2>
      </li>
      <li className="min-h-[170px] min-w-[135px] max-w-[135px] cursor-pointer
                place-content-center rounded-lg bg-[#9aabab47] p-2 phone:grow">
        <img src="https://media.fluentez.com/uploads/uploads/F-efvIUpgAmxKIYgjdtZ1.webp"
          alt="Writing"
          className="pointer-events-none mx-auto select-none" loading="lazy" />
        <h2
          className="select-none dark:text-[#e8e8ea] text-center font-body text-sm font-semibold phone:text-base">
          Writing
        </h2>
      </li>
    </ul>
  );
}
