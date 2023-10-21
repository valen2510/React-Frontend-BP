import logoBanco from 'assets/images/Banco_Pichincha_logo.png';
import './header.css';

export const Header = () => {
    return (
        <header>
            <div className="logo">
                <img
                    alt="Banco Pichincha Logo"
                    src={logoBanco}
                />
            </div>
        </header>
    )
}

