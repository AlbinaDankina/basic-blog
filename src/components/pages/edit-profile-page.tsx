// в имя и мэйл вставить ранее введенные пользователем

function EditProfile() {
  return (
    <div className="entry_container">
      <div className="entry_block">
        <form className="entry_block-wrapper">
          <h2 className="entry_block-header">Edit Profile</h2>
          <label className="label" htmlFor="username">
            Username
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Username"
            />
          </label>
          <label className="label" htmlFor="email">
            Email address
            <input
              className="input"
              type="email"
              id="email"
              placeholder="Email address"
            />
          </label>
          <label className="label" htmlFor="new-password">
            New password
            <input
              className="input"
              type="password"
              id="new-password"
              placeholder="New password"
            />
          </label>
          <label className="label" htmlFor="avatar">
            Avatar image (url)
            <input
              className="input"
              type="password"
              id="avatar"
              placeholder="Avatar image"
            />
          </label>
          <input className="btn btn-create" type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
