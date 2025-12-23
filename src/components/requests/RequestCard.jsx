import Link from "next/link";

export default function RequestCards({ request, onDelete }) {
    return <div>

        {/* Header */}
        <div>
            <h2>
                {request.name}
            </h2>

            <p>
                {request.description}
            </p>
        </div>

        {/* Metadata */}
        <div>
            <span className="badge">Categoría: {request.category}</span>
            <span className="badge">Ubicación: {request.location}</span>
            <span className="badge">Estado: {request.status}</span>
        </div>

        {/* Actions */}
        <div>
            <Link href={`/requests/${request.id}`}
                className="btn btn-primary">
                Ver detalles
            </Link>
            <Link href={`/requests/${request.id}/edit`}
                className="btn btn-secondary">
                Editar
            </Link>
            <button 
            onClick={() => onDelete(request.id)}
                className="btn btn-danger">
                Eliminar
            </button>
        </div>

    </div>;
}
