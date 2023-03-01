import Header from '~/components/Header';
import './contact.scss';
function Contact() {
    return (
        <>
        <Header/>
            <div className="mt-120"></div>
            <div className="container">
                <section className="contact">
                    <div className="container">
                        <h2 className="section-title">Liên hệ với chúng tôi</h2>
                        <form className="contact-form">
                            <label htmlFor="name">Họ và tên</label>
                            <input type="text" id="name" name="name" required />
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                            <label htmlFor="phone">Số điện thoại</label>
                            <input type="tel" id="phone" name="phone" required />
                            <label htmlFor="message">Nội dung tin nhắn</label>
                            <textarea id="message" name="message" required rows="20"></textarea>
                            <button type="submit">Gửi tin nhắn</button>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Contact;
