import { useState, useEffect } from "react";
import DataspaceCard from "../../components/DataspaceCard/DataspaceCard";
import { useParams } from "react-router";
import { TilesContainer } from "react-tiles-dnd";
import "../../../node_modules/react-tiles-dnd/esm/index.css";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useCategories } from "../../utils/categories";
import { Spinner } from "react-bootstrap";

const Category = () => {
  const { category_slug } = useParams();
  const LOCAL_STORAGE_KEY = category_slug + "dataspaces-order?v=3";
  const [dataSpaces, setDataSpaces] = useState([]);
  const { getCategoryBySlug, loading } = useCategories();
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    const category = getCategoryBySlug(category_slug);
    if (!category) return;

    const initialDataSpaces = category.tiles;
    const savedOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);
      const orderedDataSpaces = parsedOrder
        .map((id) => initialDataSpaces.find((dataspace) => dataspace.id === id))
        .filter(Boolean);
      setDataSpaces(
        orderedDataSpaces.length > 0 ? orderedDataSpaces : initialDataSpaces,
      );
    } else {
      setDataSpaces(initialDataSpaces);
    }
  }, [location, loading, category_slug, getCategoryBySlug, LOCAL_STORAGE_KEY]);

  if (loading)
    return (
      <div
        style={{ height: "70vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Spinner animation="border" />
      </div>
    );

  const category = getCategoryBySlug(category_slug);
  if (!category) return <p>Category not found</p>;

  return (
    <div className="container pt-3 pb-4">
      <h3 className="mt-5 mb-4 bold text-upper">{category.title}</h3>

      <div className="mt-4">
        {dataSpaces.length > 0 ? (
          <TilesContainer
            data={dataSpaces}
            renderTile={({ data, isDragging }) => (
              <DataspaceCard
                dataSpace={data}
                category={category}
                isDragging={isDragging}
              />
            )}
            forceTileWidth={320}
            forceTileHeight={410}
            className="w-100 row"
            onReorderTiles={(newOrder) => {
              setDataSpaces(newOrder);
              localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(newOrder.map((d) => d.id)),
              );
            }}
          />
        ) : (
          <p className="text-muted">{t("categories.noItems")}</p>
        )}
      </div>
    </div>
  );
};

export default Category;
