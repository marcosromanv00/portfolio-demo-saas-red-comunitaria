import Link from "next/link";
import {
    ACTION_GROUP,
    ACTION_BUTTON,
    ACTION_BUTTON_DANGER,
} from "@/components/ui/actionStyles";
import { EyeIcon } from "@/components/icons/EyeIcon";
import { EditIcon } from "@/components/icons/EditIcon";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { RequestsService } from "@/services/requests.service";

export default function RequestCards({ request, onDelete }) {
    return <article
        key={request.id}
        className=" group flex flex-col justify-between rounded-xl p-5 shadow-sm hover:shadow-md transition
              "
        style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
        }}
    >

        {/* Metadata */}
        <div>
            <h2 className="text-lg font-semibold mb-1">
                {request.name}
            </h2>

            <p className="text-sm opacity-70 line-clamp-3">
                {request.description}
            </p>

            {/* META */}
            <div className="mt-3 flex flex-col items gap-2 opacity-80">
                <span className="badge">
                    🏷️ {request.category}
                </span>
                <span className="badge">
                    📍 {request.location}
                </span>
                <span className="badge badge-status">
                    ⚙️ {request.status}
                </span>
            </div>
        </div>

        {/* Actions */}
        <div className="-mt-4 flex justify-end-safe text-sm">

            <div className={ACTION_GROUP}>
                <Link
                    href={`/requests/${request.id}`}
                    className={ACTION_BUTTON + " rounded-l-sm"}>
                    <EyeIcon className="size-5" />
                </Link>

                <Link
                    href={`/requests/${request.id}/edit`}
                    className={ACTION_BUTTON + " border-x border-gray-200"}>
                    <EditIcon className="size-5" />
                </Link>

                <button
                    onClick={() => RequestsService.remove(request.id)}
                    className={ACTION_BUTTON + " " + ACTION_BUTTON_DANGER + " rounded-r-sm"}>
                    <TrashIcon className="size-5" />
                </button>
            </div>
        </div>
    </article>;
}
