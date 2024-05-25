function PrivateRoute({ children }) {
    const { currentUser } = useAuth();
    
    // Check if the current user's email is the admin email address
    const isAdmin = currentUser && currentUser.email === 'admin@mail.com';
  
    return currentUser ? (
      isAdmin ? (
        <Navigate to="/admin" />
      ) : (
        children
      )
    ) : (
      <Navigate to="/login" replace />
    );
  }
  