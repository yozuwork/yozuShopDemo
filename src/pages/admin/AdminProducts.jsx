
export default function AdminProducts(){
    return (
        <div className="flex-1 p-4">
          <h3 className="text-xl font-semibold">產品列表</h3>
          <hr className="my-2" />
          <div className="text-right mb-3">
            <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700">
              建立新商品
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">分類</th>
                  <th className="px-4 py-2 border">名稱</th>
                  <th className="px-4 py-2 border">售價</th>
                  <th className="px-4 py-2 border">啟用狀態</th>
                  <th className="px-4 py-2 border">編輯</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">分類</td>
                  <td className="px-4 py-2 border">名稱</td>
                  <td className="px-4 py-2 border">價格</td>
                  <td className="px-4 py-2 border">啟用</td>
                  <td className="px-4 py-2 border">
                    <button className="bg-blue-600 text-white text-sm px-2 py-1 rounded hover:bg-blue-700">
                      編輯
                    </button>
                    <button className="border border-red-500 text-red-500 text-sm px-2 py-1 rounded hover:bg-red-500 hover:text-white ml-2">
                      刪除
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav className="mt-4">
            <ul className="inline-flex items-center space-x-1">
              <li>
                <a
                  href="/"
                  className="px-3 py-1 border border-gray-300 rounded text-gray-400 cursor-not-allowed"
                >
                  &laquo;
                </a>
              </li>
              {[...new Array(5)].map((_, i) => (
                <li key={`${i}_page`}>
                  <a
                    href="/"
                    className={`px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 ${
                      i + 1 === 1 ? "bg-blue-600 text-white" : ""
                    }`}
                  >
                    {i + 1}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/"
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                >
                  &raquo;
                </a>
              </li>
            </ul>
          </nav>
        </div>
    )
}
