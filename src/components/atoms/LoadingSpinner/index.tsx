export const LoadingSpinner = ({ message }: { message?: string }) => (
  <div className="flex items-center gap-[0.75rem] py-[2rem] justify-center">
    <div className="w-[2.5rem] h-[2.5rem] border-[3px] border-[rgba(212,168,83,0.2)] border-t-accent-gold rounded-full animate-spin" />
    {message && (
      <p className="text-text-secondary font-body">
        {message}
      </p>
    )}
  </div>
);

export const FullPageLoader = ({ message }: { message?: string }) => (
  <div className="w-screen min-h-screen flex items-center justify-center flex-col gap-[1rem] bg-surface-page">
    <div className="w-[3.5rem] h-[3.5rem] border-[4px] border-[rgba(212,168,83,0.2)] border-t-accent-gold rounded-full animate-spin" />
    {message && (
      <p className="text-text-secondary font-body text-[1.1rem]">
        {message}
      </p>
    )}
  </div>
);
