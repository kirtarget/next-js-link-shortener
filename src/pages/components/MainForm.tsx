const MainForm = () => {
    return (
        <div>
            <form>
                <label htmlFor="nameInput" className="label">Введите название</label>
                <input type="text" name="nameInput" id="nameInput" placeholder="ИМЯ БЛОГЕРА/ПРОМОКОД" className="input input-bordered w-full bg-white my-2" />
                <label htmlFor="linkInput" className="label">Вставьте ссылку</label>
                <input type="text" name="linkInput" id="linkInput" placeholder="https://sotkaonline.ru/" className="input input-bordered w-full bg-white my-2" />
                <button type="submit" className="btn">Сократить</button>
            </form>
        </div>
    );
}

export default MainForm;