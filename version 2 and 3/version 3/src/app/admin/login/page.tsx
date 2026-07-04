import { LoginForm } from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-rich-soil rounded-xl p-8 border border-subtle-earth">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-harvest-gold/20 flex items-center justify-center">
            <span className="text-2xl">{'\uD83C\uDF3E'}</span>
          </div>
          <h1 className="font-heading text-2xl text-harvest-gold">Goddard Projects</h1>
          <p className="text-dusty-clay text-sm mt-1">Farm Management</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
