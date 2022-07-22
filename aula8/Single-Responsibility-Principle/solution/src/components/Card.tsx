import React from 'react';
import '../App.css';

interface IProps {
    titulo: string;
    imagem: string;
}

const Card: React.FC<IProps> = ({ titulo, imagem }) => {
    return (
        <div className="card">
            <div>
                <img src={imagem} alt={`imagem-${titulo}`} />
            </div>
            <div>
                <h2>{titulo}</h2>
            </div>
        </div>
    );
};

export default Card;
