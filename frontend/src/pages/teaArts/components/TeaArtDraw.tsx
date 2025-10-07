import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";
import { Stage, Layer, Line, Circle } from "react-konva";
import { SketchPicker } from "react-color";
import { FaUndo, FaRedo, FaTrashAlt } from "react-icons/fa";
import Konva from "konva";

interface DrawLine {
  points: number[];
  color: string;
  size: number;
  id: string;
}

// ref用のインターface
export interface TeaArtDrawRef {
  getArtAsBase64: () => string | null;
}

interface TeaArtDrawProps {
  onArtComplete?: (base64Data: string) => void;
  onArtChange?: (hasContent: boolean) => void;
  ref?: React.Ref<TeaArtDrawRef>;
  onBackgroundColorChange?: (color: string) => void;
}

const TeaArtDraw = ({ onArtComplete, onArtChange, ref }: TeaArtDrawProps) => {
  const [lines, setLines] = useState<DrawLine[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<DrawLine[][]>([[]]);
  const [historyStep, setHistoryStep] = useState(0);

  // ペン設定
  const [selectedPenColor, setSelectedPenColor] = useState("#fdf8f8"); // ペンの初期カラー
  const [penSize, setPenSize] = useState(5);

  // お茶の色
  const [backgroundColor, setBackgroundColor] = useState("#5B664B"); // お茶の初期カラー
  const [showColorPicker, setShowColorPicker] = useState(false);

  const stageRef = useRef<Konva.Stage>(null);

  // 固定ペンカラー
  const penColors = [
    { name: "ミルク", color: "#fdf8f8" },
    { name: "イチゴ", color: "#f5c7d6" },
    { name: "抹茶", color: "#bed0a0" },
    { name: "チョコ", color: "#ad9080" },
  ];

  // canvasは常に430px、表示サイズとコンテナサイズはスマホ時で切り替え
  const CANVAS_SIZE = 430; // 常に430px（送信用の本来サイズ）
  const [containerSize, setContainerSize] = useState(450); // 外側div
  const [displayScale, setDisplayScale] = useState(1); // 表示倍率

  // レスポンシブサイズ調整
  useEffect(() => {
    const updateSizes = () => {
      if (window.innerWidth <= 450) {
        // スマホサイズ
        setContainerSize(340); // div: 340px
        setDisplayScale(320 / 430); // canvas表示: 320px (430 * 0.744)
      } else {
        // PCサイズ
        setContainerSize(450); // div: 450px
        setDisplayScale(1); // canvas表示: 430px (430 * 1)
      }
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  // 円の設定（430px基準）
  const centerX = CANVAS_SIZE / 2; // 215px
  const centerY = CANVAS_SIZE / 2; // 215px
  const circleRadius = CANVAS_SIZE / 2; // 215px

  // 点が円の中にあるかチェック
  const isPointInCircle = useCallback(
    (x: number, y: number): boolean => {
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      return distance <= circleRadius;
    },
    [centerX, centerY, circleRadius]
  );

  // 座標変換を含む描画開始
  const handleMouseDown = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    // 表示スケールを考慮して430px基準の座標に変換
    const normalizedX = pos.x / displayScale;
    const normalizedY = pos.y / displayScale;

    if (!isPointInCircle(normalizedX, normalizedY)) return;

    setIsDrawing(true);

    const newLine: DrawLine = {
      points: [normalizedX, normalizedY], // 常に430px基準の座標
      color: selectedPenColor,
      size: penSize,
      id: Date.now().toString(),
    };

    const newLines = [...lines, newLine];
    setLines(newLines);

    // 履歴を更新
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(newLines);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  }, [
    lines,
    selectedPenColor,
    penSize,
    isPointInCircle,
    history,
    historyStep,
    displayScale,
  ]);

  // 座標変換を含む描画中
  const handleMouseMove = useCallback(() => {
    if (!isDrawing) return;

    const stage = stageRef.current;
    if (!stage) return;

    const point = stage.getPointerPosition();
    if (!point) return;

    // 表示スケールを考慮して430px基準の座標に変換
    const normalizedX = point.x / displayScale;
    const normalizedY = point.y / displayScale;

    // 円の外に出た場合は描画を停止（正規化された座標で判定）
    if (!isPointInCircle(normalizedX, normalizedY)) {
      setIsDrawing(false);
      return;
    }

    const newLines = [...lines];
    const lastLine = newLines[newLines.length - 1];
    lastLine.points = lastLine.points.concat([normalizedX, normalizedY]);

    setLines(newLines);
  }, [isDrawing, lines, isPointInCircle, displayScale]);

  // 描画終了
  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  // 戻るボタン
  const handleUndo = useCallback(() => {
    if (historyStep === 0) return;

    const newStep = historyStep - 1;
    setHistoryStep(newStep);
    setLines(history[newStep]);
  }, [historyStep, history]);

  // 進むボタン
  const handleRedo = useCallback(() => {
    if (historyStep === history.length - 1) return;

    const newStep = historyStep + 1;
    setHistoryStep(newStep);
    setLines(history[newStep]);
  }, [historyStep, history]);

  // 全部消すボタン
  const handleClear = useCallback(() => {
    setLines([]);
    setHistory([[]]);
    setHistoryStep(0);
  }, []);

  // Base64変換メソッド
  const getArtAsBase64 = useCallback((): string | null => {
    const stage = stageRef.current;
    if (!stage) return null;

    return stage.toDataURL({
      mimeType: "image/png",
      quality: 1,
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      pixelRatio: 1,
    });
  }, []);

  // 描画内容が変更された時の処理
  useEffect(() => {
    const hasContent = lines.length > 0;
    onArtChange?.(hasContent);

    if (hasContent) {
      const base64Data = getArtAsBase64();
      if (base64Data) {
        onArtComplete?.(base64Data);
      }
    }
  }, [lines, onArtComplete, onArtChange, getArtAsBase64]);

  // 外部から呼び出せるメソッド
  useImperativeHandle(
    ref,
    () => ({
      getArtAsBase64,
      getBackgroundColor: () => backgroundColor,
    }),
    [getArtAsBase64, backgroundColor]
  );

  return (
    <div className="flex flex-col items-center justify-center gap-7 px-5 sm:flex-row">
      {/* 描画エリア */}
      <div
        className="cup-bg border-neutral relative flex aspect-square items-center justify-center border bg-[url(../images/cup_img_big.png)] bg-center"
        style={{ width: containerSize, height: containerSize }}
      >
        <div
          className="tea-texture pointer-events-none absolute z-10 aspect-square bg-[url(../images/tea_texture.png)] bg-center mix-blend-overlay"
          style={{
            width: containerSize,
            height: containerSize,
          }}
        ></div>
        <Stage
          width={CANVAS_SIZE} // 常に430px（送信用サイズ）
          height={CANVAS_SIZE} // 常に430px（送信用サイズ）
          scaleX={displayScale} // PC: 1, スマホ: 0.744
          scaleY={displayScale} // PC: 1, スマホ: 0.744
          pixelRatio={1} // 軽量化
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          ref={stageRef}
          className="overflow-hidden"
        >
          <Layer>
            {/* 背景円 */}
            <Circle
              x={centerX}
              y={centerY}
              radius={circleRadius}
              fill={backgroundColor}
            />

            {/* 描画された線 */}
            {lines.map((line) => (
              <Line
                key={line.id}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.size}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation="source-over"
              />
            ))}
          </Layer>
        </Stage>
      </div>

      {/* コントロールパネル */}
      <div className="flex flex-col gap-6 text-left">
        {/* ペンカラー選択 */}
        <div>
          <div className="text-secondary mb-1 space-x-2">
            <span className="josefin-sans text-3xl">Pen Color</span>
            <span>ーペンの色ー</span>
          </div>

          <div className="grid w-full grid-cols-2 gap-1">
            {penColors.map((pen) => (
              <div
                key={pen.color}
                className="hover:bg-primary/10 flex cursor-pointer items-center gap-1 p-2 transition-colors"
                onClick={() => setSelectedPenColor(pen.color)}
              >
                {/* カラー円ボタン */}
                <button
                  className={`size-10 cursor-pointer rounded-full border-2 transition-all ${
                    selectedPenColor === pen.color
                      ? "border-secondary"
                      : "border-base-200"
                  }`}
                  style={{
                    backgroundColor: pen.color,
                  }}
                />

                {/* ペン名テキスト */}
                <span
                  className={`text-secondary text-sm transition-colors ${
                    selectedPenColor === pen.color ? "font-bold" : ""
                  }`}
                >
                  {pen.name}ペン
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ペンサイズ調整 */}
        <div className="pen-size">
          <div className="text-secondary mb-2 space-x-2">
            <span className="josefin-sans text-3xl">Pen Size</span>
            <span>ーペンの太さー</span>
          </div>

          <input
            type="range"
            min={1}
            max="20"
            value={penSize}
            onChange={(e) => setPenSize(Number(e.target.value))}
            className="range range-primary range-sm"
          />
          <span className="text-secondary text-sm">サイズ: {penSize}px</span>
        </div>

        {/* お茶の色選択 */}
        <div className="relative">
          <div className="text-secondary mb-2 space-x-2">
            <span className="josefin-sans text-3xl">Tea Color</span>
            <span>ーお茶の色ー</span>
          </div>
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="size-10 cursor-pointer rounded-full"
            style={{
              backgroundColor: backgroundColor,
            }}
          />
          {/* カラーピッカー */}
          {showColorPicker && (
            <div className="absolute z-50 text-center">
              <div
                className="fixed inset-0"
                onClick={() => setShowColorPicker(false)}
              />
              <div className="relative z-10">
                <SketchPicker
                  color={backgroundColor}
                  onChange={(color) => setBackgroundColor(color.hex)}
                  disableAlpha={true}
                  presetColors={[
                    "#D4563B",
                    "#E28F33",
                    "#D8CD10",
                    "#6EB264",
                    "#6FA8A5",
                    "#6573A0",
                    "#805F8B",
                    "#9B4A63",
                  ]}
                />
              </div>
            </div>
          )}
        </div>

        {/* 操作ボタン */}
        <div className="flex gap-x-2">
          <button
            onClick={handleUndo}
            disabled={historyStep === 0}
            className="btn btn-primary font-normal"
          >
            <FaUndo />
            戻る
          </button>

          <button
            onClick={handleRedo}
            disabled={historyStep === history.length - 1}
            className="btn btn-secondary font-normal"
          >
            <FaRedo />
            進む
          </button>

          <button
            onClick={handleClear}
            className="btn btn-accent btn-outline font-normal"
          >
            <FaTrashAlt />
            全部消す
          </button>
        </div>
      </div>

      {/* レスポンシブ対応のCSS */}
      <style>
        {`
    @media (max-width: 450px) {
      .konvajs-content {
        width: 340px !important;
        height: 340px !important;
        
      }
      .konvajs-content canvas {
        top: 11px !important;
        left: 11px !important;
        
      }
      .cup-bg, .tea-texture{
      background-size: 172%;
      }
    }
  `}
      </style>
    </div>
  );
};

// forwardRefで参照を渡せるようにする
export default TeaArtDraw;
